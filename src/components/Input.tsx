import React, { useState } from "react";
import uuid from "react-uuid";
import { Todo } from "../types/todoType";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "../api/todos";
import styled from "styled-components";

function Input() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

// Query
const queryClient = useQueryClient();
const addMutation = useMutation(addTodo, {
  onSuccess: (data) => {
    queryClient.invalidateQueries("todos");
  },
});

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmitButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: uuid(),
      title,
      content,
      isDone: false,
    };
    if (!title || !content) {
      return alert("제목과 내용을 모두 입력하세요");
    }
    addMutation.mutate(newTodo);
    setTitle("");
    setContent("");
  };


  return (
    <StInputContainer onSubmit={handleSubmitButtonClick}>
      <StInputBox>
        <input type="text" 
                value={title} 
                onChange={handleTitleChange}
                placeholder="제목을 입력해주세요."></input>
      </StInputBox>
      <StInputBox>
        <input type="text"
               value={content}
               onChange={handleContentsChange}
               placeholder="내용을 입력해주세요."></input>
      </StInputBox>
      <button type="submit">제출</button>
    </StInputContainer>
  );
}

export default Input;

const StInputContainer = styled.form`
  display: flex;
  margin: 1.5rem;
  gap: 1.5rem;
  
  button {
    background-color: #161B33;
    border: 0;
    border-radius: 10px;
    width: 100px;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }
`;

const StInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  
  input {
    width: 15rem;
    height: 2rem;
    outline: none;
    border-bottom: 2px solid black;
    border-radius: 5px;
  }
`;
