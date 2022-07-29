from fastapi import FastAPI, Depends
from api.routers import persons, user
from starlette.staticfiles import StaticFiles
import uvicorn


app = FastAPI()


app.include_router(persons.router)
app.include_router(user.router)
app.mount("/static", StaticFiles(directory="./api/templates"), name="static")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8002)
