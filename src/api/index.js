import { request } from './request';

export function getPerfGroupList() {
  return request('/api/performance/group_list');
}

export function getPerfGroupPositions(params) {
  return request('/api/performance/group_positions', params, 'post', { timeout: 10000 });
}

export function getPerfGroupTrades(params) {
  return request('/api/performance/group_trades', params);
}

export function getPerfGroupTransfers(params) {
  return request('/api/performance/group_transfers', params);
}