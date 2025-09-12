import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Message } from '../types';
import { ChevronDownIcon, ChevronRightIcon, DownloadIcon } from '../components/icons';
import Pagination from '../components/Pagination';
import { useTable } from '../contexts/TableContext';
import DatePresetPicker from '../components/DatePresetPicker';

const PAGE_SIZE = 15;

const HistoryPage: React.FC = () => {
  const { currentConfig } = useTable();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [groupedMessages, setGroupedMessages] = useState<Record<string, Message[]>>({});
  const [sessionOrder, setSessionOrder] = useState<string[]>([]);
  const [expandedSessions, setExpandedSessions] = useState<Record<string, boolean>>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const [filters, setFilters] = useState<Record<string, any>>(() => {
    const initialFilters: Record<string, any> = { page: '1' };
    searchParams.forEach((value, key) => {
      initialFilters[key] = value;
    });
    return initialFilters;
  });

  const currentPage = parseInt(filters.page || '1', 10);
  
  const fetchMessages = useCallback(async (page: number, currentFilters: Record<string, any>) => {
    if (!currentConfig) return;

    setLoading(true);
    setError(null);
    try {
        let baseQuery = supabase.from(currentConfig.tableName).select('session_id, created_at');

        if (currentFilters.from) {
            baseQuery = baseQuery.gte('created_at', new Date(currentFilters.from).toISOString());
        }
        if (currentFilters.to) {
            const toDate = new Date(currentFilters.to);
            toDate.setHours(23, 59, 59, 999);
            baseQuery = baseQuery.lte('created_at', toDate.toISOString());
        }

        const { data: filteredData, error: filterError } = await baseQuery;
        if (filterError) throw filterError;

        const sessionLastDates: Record<string, string> = {};
        (filteredData || []).forEach(msg => {
            if (!sessionLastDates[msg.session_id] || new Date(msg.created_at) > new Date(sessionLastDates[msg.session_id])) {
                sessionLastDates[msg.session_id] = msg.created_at;
            }
        });
        
        const finalSessionIds = Object.keys(sessionLastDates).sort((a,b) => 
            new Date(sessionLastDates[b]).getTime() - new Date(sessionLastDates[a]).getTime()
        );
        
        setTotalCount(finalSessionIds.length);
        
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        const paginatedSessionIds = finalSessionIds.slice(from, to);

        if (paginatedSessionIds.length === 0) {
            setGroupedMessages({});
            setSessionOrder([]);
            setLoading(false);
            return;
        }

        const { data: finalData, error: finalError } = await supabase
            .from(currentConfig.tableName)
            .select('*')
            .in('session_id', paginatedSessionIds)
            .order('created_at', { ascending: true });
        
        if (finalError) throw finalError;

        const groups: Record<string, Message[]> = {};
        (finalData || []).forEach(msg => {
            if (!groups[msg.session_id]) groups[msg.session_id] = [];
            groups[msg.session_id].push(msg);
        });

        setGroupedMessages(groups);
        setSessionOrder(paginatedSessionIds);

    } catch (err: any) {
      setError(err?.message || String(err) || "An unexpected error occurred.");
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  }, [currentConfig]);

  useEffect(() => {
    fetchMessages(currentPage, filters);
  }, [currentPage, filters, fetchMessages]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && (key !== 'page' || value !== '1')) {
        params.set(key, String(value));
      }
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);
  
  const handleFilterChange = (id: string, value: any) => {
    setFilters(prev => ({ ...prev, [id]: value, page: '1' }));
    if(id === 'from' || id === 'to') setActivePreset(null);
  };

  const handlePresetSelect = (preset: '7d' | '30d' | '90d') => {
      const to = new Date();
      const from = new Date();
      if (preset === '7d') from.setDate(to.getDate() - 7);
      if (preset === '30d') from.setDate(to.getDate() - 30);
      if (preset === '90d') from.setDate(to.getDate() - 90);
      
      const fromString = from.toISOString().split('T')[0];
      const toString = to.toISOString().split('T')[0];
      
      setFilters(prev => ({ ...prev, from: fromString, to: toString, page: '1' }));
      setActivePreset(preset);
  }

  const handleFilterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      fetchMessages(1, filters);
  };

  
  
  const toggleSession = (sessionIdToToggle: string) => {
    setExpandedSessions(prev => ({ ...prev, [sessionIdToToggle]: !prev[sessionIdToToggle] }));
  };

  if (!currentConfig) {
      return <div className="text-center py-10 text-gray-400">Seleccione una tabla para comenzar...</div>;
  }
  
  const primaryColumn = currentConfig.columns.find(c => c.isPrimary) || currentConfig.columns[0];
  const otherColumns = currentConfig.columns.filter(c => !c.isPrimary);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Historial de Chats</h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <form onSubmit={handleFilterSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
            {currentConfig.filters.filter(f => f.type === 'text').map(filter => (
              <div key={filter.id}>
                 <input type="text" placeholder={filter.label} value={filters[filter.id] || ''} onChange={e => handleFilterChange(filter.id, e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            ))}
            {currentConfig.filters.filter(f => f.type === 'select').map(filter => (
              <div key={filter.id}>
                <select value={filters[filter.id] || 'all'} onChange={e => handleFilterChange(filter.id, e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 h-10">
                  <option value="all">{filter.label} (Todos)</option>
                  {filter.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            ))}
            <div className="flex gap-2 col-span-full sm:col-span-1">
                
                
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mt-4">
              <div>
                  <label className="text-xs text-gray-400">Desde</label>
                  <input type="date" value={filters['from'] || ''} onChange={e => handleFilterChange('from', e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                  <label className="text-xs text-gray-400">Hasta</label>
                  <input type="date" value={filters['to'] || ''} onChange={e => handleFilterChange('to', e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="sm:col-span-2">
                 <label className="text-xs text-gray-400 block mb-1">Rangos Rápidos</label>
                 <DatePresetPicker onSelect={handlePresetSelect} selected={activePreset} />
              </div>
          </div>
        </form>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md md:overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 w-1/2">{primaryColumn.header}</th>
                {otherColumns.map(col => <th key={col.id} scope="col" className={`px-6 py-3 ${col.className}`}>{col.header}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-900">
              {loading ? (
                [...Array(PAGE_SIZE)].map((_, i) => (
                  <tr key={i}><td colSpan={currentConfig.columns.length}><div className="h-24 bg-gray-700 animate-pulse m-2 rounded"></div></td></tr>
                ))
              ) : error ? (
                  <tr><td colSpan={currentConfig.columns.length} className="text-center py-8 text-red-500">{error}</td></tr>
              ) : sessionOrder.length > 0 ? (
                sessionOrder.flatMap(sId => {
                  const sessionMessages = groupedMessages[sId];
                  if (!sessionMessages || sessionMessages.length === 0) return [];
                  
                  const isExpanded = !!expandedSessions[sId];
                  // Inject the full session messages into the first message for context
                  const firstMessage = { ...sessionMessages[0], _sessionMessages: sessionMessages };
                  
                  return [
                    <tr key={sId} className="hover:bg-gray-700/50">
                      <td className="px-6 py-2 align-top" onClick={() => toggleSession(sId)}>
                        <div className="flex items-start cursor-pointer">
                            <span className="mr-2 mt-1 flex-shrink-0 text-gray-400">
                                {isExpanded ? <ChevronDownIcon className="w-5 h-5"/> : <ChevronRightIcon className="w-5 h-5"/>}
                            </span>
                            <div className="flex-grow">{primaryColumn.render ? primaryColumn.render(primaryColumn.accessor(firstMessage), firstMessage) : primaryColumn.accessor(firstMessage)}</div>
                        </div>
                      </td>
                      {otherColumns.map(col => <td key={col.id} className={`px-6 py-4 align-top ${col.className}`}>{col.render ? col.render(col.accessor(firstMessage), firstMessage) : col.accessor(firstMessage)}</td>)}
                    </tr>,
                    isExpanded && sessionMessages.map(msg => (
                      <tr key={msg.id} className="bg-gray-800">
                        <td className="pl-16 pr-6 py-2" colSpan={currentConfig.columns.length}>
                          <div className="text-xs text-gray-500 mb-1">{new Date(msg.created_at).toLocaleString('es-ES')}</div>
                           {primaryColumn.render ? primaryColumn.render(primaryColumn.accessor(msg), msg) : primaryColumn.accessor(msg)}
                        </td>
                      </tr>
                    ))
                  ];
                })
              ) : (
                  <tr><td colSpan={currentConfig.columns.length} className="text-center py-8">No se encontraron mensajes con sus criterios.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile View */}
        <div className="md:hidden">
            {loading ? (
                 [...Array(5)].map((_, i) => ( <div key={i} className="p-4 border-b border-gray-700"><div className="h-32 bg-gray-700 rounded animate-pulse"></div></div>))
            ) : error ? (
                <div className="p-4 text-center text-red-500">{error}</div>
            ) : sessionOrder.length > 0 ? (
                sessionOrder.map(sId => {
                    const sessionMessages = groupedMessages[sId];
                    if (!sessionMessages || sessionMessages.length === 0) return null;
                    const firstMessage = { ...sessionMessages[0], _sessionMessages: sessionMessages };
                     return (
                        <div key={sId} className="p-4 border-b border-gray-700">
                           <div onClick={() => toggleSession(sId)} className="flex items-start cursor-pointer">
                                <span className="mr-2 mt-1 flex-shrink-0 text-gray-400">
                                    {expandedSessions[sId] ? <ChevronDownIcon className="w-5 h-5"/> : <ChevronRightIcon className="w-5 h-5"/>}
                                </span>
                                <div className="w-full">
                                    {primaryColumn.render ? primaryColumn.render(primaryColumn.accessor(firstMessage), firstMessage) : primaryColumn.accessor(firstMessage)}
                                </div>
                           </div>
                           <div className="mt-3 pl-8 space-y-2 text-sm">
                               {otherColumns.map(col => (
                                   <div key={col.id} className="flex justify-between">
                                       <span className="font-semibold text-gray-300">{col.header}:</span>
                                       <span className="text-right text-gray-400">{col.render ? col.render(col.accessor(firstMessage), firstMessage) : col.accessor(firstMessage)}</span>
                                   </div>
                               ))}
                           </div>
                           {expandedSessions[sId] && (
                               <div className="pl-8 mt-4 space-y-3">
                                   {sessionMessages.map(msg => (
                                       <div key={msg.id} className="border-t border-gray-700 pt-3">
                                            <div className="text-xs text-gray-500 mb-1">{new Date(msg.created_at).toLocaleString('es-ES')}</div>
                                            {primaryColumn.render ? primaryColumn.render(primaryColumn.accessor(msg), msg) : primaryColumn.accessor(msg)}
                                       </div>
                                   ))}
                               </div>
                           )}
                        </div>
                     )
                })
            ) : (
                <div className="p-4 text-center">No se encontraron mensajes.</div>
            )}
        </div>
      </div>
      <Pagination currentPage={currentPage} totalCount={totalCount} pageSize={PAGE_SIZE} onPageChange={(p) => handleFilterChange('page', p)} />
    </div>
  );
};

export default HistoryPage;