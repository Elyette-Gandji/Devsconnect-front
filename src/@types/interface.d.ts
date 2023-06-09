export interface Flash {
  type: 'success' | 'error';
  children: React.ReactNode;
  duration?: number;
}
