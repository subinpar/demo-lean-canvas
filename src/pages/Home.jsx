import { useState } from 'react';
import { createCanvas, deleteCanvas, getCanvases } from '../api/canvas';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ViewToggle from '../components/ViewToggle';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function Home() {
  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined,
  });

  const [isGridView, setIsGridView] = useState(true);
  const queryClient = useQueryClient();

  const handleFilter = (key, value) => setFilter({ ...filter, [key]: value });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', filter.searchText, filter.category],
    queryFn: () =>
      getCanvases({
        title_like: filter.searchText,
        category: filter.category,
      }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  const handleDeleteItem = id => deleteCanvasMutation(id);
  const handleCreateCanvas = () => createNewCanvas();

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-2 flex-col w-full sm:flex-row mb-4 sm:mb-0">
          <SearchBar
            searchText={filter.searchText}
            onSearch={val => handleFilter('searchText', val)}
          />
          <CategoryFilter
            category={filter.category}
            onChange={val => handleFilter('category', val)}
          />
        </div>
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>

      <div className="flex justify-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
          등록하기
        </Button>
      </div>

      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={refetch} />}

      {!isLoading && !error && Array.isArray(data) && (
        <CanvasList
          filteredData={data}
          isGridView={isGridView}
          searchText={filter.searchText}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}

export default Home;
