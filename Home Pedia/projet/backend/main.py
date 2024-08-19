from fastapi import FastAPI
from routes.data_routes_nosql import router as data_routes_router
from routes.data_routes_sql import router as data_routes_sql_router

# Initialize app
app = FastAPI()

# Inclure le premier router
app.include_router(data_routes_router, prefix="/datanosql", tags=["datanosql"])

# Inclure le second router
app.include_router(data_routes_sql_router, prefix="/data", tags=["data"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
