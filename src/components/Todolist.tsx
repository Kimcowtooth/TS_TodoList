import React from "react";
import styled from "styled-components";
import { Todo } from "../types/todoType";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTodo, getTodos, switchTodo } from "../api/todos";

function Todolist({ isActive }: { isActive: boolean }) {
  const handleDeleteTodo = (id: string) => {
    const result: boolean = window.confirm("정말 삭제하시겠습니까?");
    if (result === true) {
      alert("삭제완료.");
      deleteMutation.mutate(id);
    } else {
      alert("삭제취소.");
    }
  };

  const handleSwitchTodo = (id: string, isDone: boolean) => {
    switchMutation.mutate({ id, isDone });
  };

  //Query
  const { data, isLoading, isError } = useQuery("todos", getTodos);

  const queryClient = useQueryClient();

  //Delete
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos");
    },
  });

  //Patch
  const switchMutation = useMutation(switchTodo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos");
    },
  });

  if(isLoading){
    return <h3>로딩중입니다.</h3>
  }
  if (isError){
    return <h3>오류가 발생했습니다.</h3>
  }

  return (
    <StContainer>
      <StTodoListHeader>
      {isActive ? "해야 할 일 ✍" : "완료한 일 ✅"}
      </StTodoListHeader>
      <StTodoListBox>
        {data
          .filter((todo: Todo) => {
            return todo.isDone === !isActive;
          })
          .map((todo: Todo) => {
            return (
              <StTodoCard key={todo.id}>
                <h2>{todo.title}</h2>
                <p>{todo.content}</p>
                <StBtnBox>
                  <button
                    onClick={() => handleSwitchTodo(todo.id, todo.isDone)}
                  >
                    {isActive ? "완료" : "취소"}
                  </button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    삭제
                  </button>
                </StBtnBox>
              </StTodoCard>
            );
          })}
      </StTodoListBox>
    </StContainer>
  );
}

export default Todolist;

const StContainer = styled.div`
  background-color: #474973;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 400px;
`;

const StTodoListHeader = styled.div`
  color : white;
  font-size: 20px;
  font-weight: 600;
`

const StTodoListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const StTodoCard = styled.div`
  color : black ;
  background-color: #ebeffc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.3rem;
  width: 20rem;
  height: 10rem;
  padding: 1.3rem;
  border: 3px solid black;
  border-radius: 1rem;

`;

const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 1.5rem;

  button {
    background: transparent;
    width: 7rem;
    height: 2rem;
    color: white;
    border: 2px solid black;
    border-radius: 5px;
  }

  button:nth-child(1) {
    background-color: #474973;
    cursor: pointer;
  }

  button:nth-child(2) {
    background-color: #474973;
    cursor: pointer;
  }
`;
