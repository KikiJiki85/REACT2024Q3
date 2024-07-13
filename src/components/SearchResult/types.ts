export interface SearchResultProps {
  results: Array<{ name: string; description: string; id: string }>;
  isLoading: boolean;
  onItemClick: (id: string) => void;
}
