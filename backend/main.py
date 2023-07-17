from fastapi import FastAPI, HTTPException
from database import get_all_tasks, create_task, get_one_task, get_one_task_id, delete_task, update_task
from models import Task, UpdateTask

app = FastAPI()

@app.get('/')
def welcome():
    return {'message': 'Welcome to the my FastAPI API'}

@app.get('/api/tasks')
async def get_tasks():
    tasks = await get_all_tasks()
    return tasks

@app.post('/api/tasks', response_model=Task)
async def save_task(task: Task):
    task_found = await get_one_task(task.title)
    if task_found:
        raise HTTPException(409, 'Task already exists')
    response = await create_task(task.dict())
    if response:
        return response
    raise HTTPException(400, 'Something went wrong')

@app.get('/api/tasks/{id}', response_model=Task)
async def get_task(id: str):
    task = await get_one_task_id(id)
    if task:
        return task
    raise HTTPException(404, f'Task with id {id} not found')

@app.put('/api/tasks/{id}', response_model=Task)
async def put_task(id: str, task: UpdateTask):
    response = await update_task(id, task)
    if response:
        return response
    raise HTTPException(404, f'Task with id {id} nor found')

@app.delete('/api/tasks/{id}')
async def remove_task(id: str):
    response = await delete_task(id)
    if response:
        return "Task deleted succesfully"
    raise HTTPException(404, f'Task with id {id} not found')
