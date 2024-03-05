// import type { todo } from "@prisma/client";  
import { api } from "@/trpc/server";

// changed page to run on server side only, using trpc/server instead of trpc/react 

const Viewtodos: React.FC = async () => {
  const todos = await api.todo.getAllTodos.query();

  return (
    <div className="mx-auto max-w-md pt-12 text-center">
      <h2 className="text-2xl font-bold">User View todos</h2>
      {todos.length === 0 ? (
        <p data-testid="no-todos" className="text-xl mt-4 text-gray-500">There is no todos yet</p>
      ) : (
        <ul data-testid="all-todos" className="mt-4">
          {todos.map((todo) => (
            <li data-testid="first-todo" key={todo.id} className="mb-4 rounded-lg bg-gray-200 p-3">
              <h3 className="text-lg font-bold">{todo.title}</h3>
              <p className="text-xs text-gray-500">
                Created at: {new Date(todo.createdAt).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Updated at: {new Date(todo.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Viewtodos;