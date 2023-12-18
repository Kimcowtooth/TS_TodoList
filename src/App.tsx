import './App.css';
import styled from 'styled-components';
import Header from './components/Header';
import Input from './components/Input';
import Todolist from './components/Todolist';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Container>
        <Header />
        <Input />
        <Todolist isActive={true} />
        <Todolist isActive={false} />
    </Container>
  </QueryClientProvider>
  );
}

export default App;

const Container = styled.div`
  box-sizing: border-box;
`
