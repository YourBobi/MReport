from fastapi.responses import HTMLResponse
from fastapi import Request, APIRouter, Depends, Form, status, HTTPException
from fastapi.templating import Jinja2Templates
from db.repository import persons
from sqlalchemy.orm import Session
from db.base import get_db_tdisk
from api.forms.form_info import SearchInfoForm


templates = Jinja2Templates(directory="./api/templates")

router = APIRouter()  # для конечной версии


@router.get("/report/1", response_class=HTMLResponse, tags=["report"])
async def report1_get(request: Request):
    form = SearchInfoForm(request)
    return templates.TemplateResponse("general_pages/report1.html", context={"request": request, "form": form})


@router.post("/report/1/{user}", tags=["report"])
async def report1_post(request: Request, db: Session = Depends(get_db_tdisk)):
    form = SearchInfoForm(request)
    await form.load_data()
    try:
        data = persons.get_info(db, params=form)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED, detail=e
        )

    return templates.TemplateResponse("general_pages/report1.html", context={"request": request,
                                                                             "form": form,
                                                                             "data": data})


@router.get("/", response_class=HTMLResponse, tags=["home"])
async def get_by_phone(request: Request):
    return templates.TemplateResponse("general_pages/home.html", context={"request": request})
