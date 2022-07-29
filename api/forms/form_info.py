from datetime import datetime
from typing import List
from typing import Optional

from fastapi import Request


class SearchInfoForm:
    def __init__(self, request: Request):
        self.request: Request = request
        self.errors: List = []
        self.phone_number: Optional[str] = ''
        self.identify_number: Optional[str] = ''
        self.abs_number: Optional[str] = ''
        self.data_from: Optional[datetime] = datetime.now()
        self.data_to: Optional[datetime] = datetime.now()
        self.action = ''

    async def load_data(self):
        form = await self.request.form()
        self.phone_number = form.get("phone_number")
        self.identify_number = form.get("identify_number")
        self.abs_number = form.get("abs_number")
        self.data_from = datetime.strptime(form.get("data_from"), "%Y-%m-%dT%H:%M")
        self.data_to = datetime.strptime(form.get("data_to"), "%Y-%m-%dT%H:%M")
        self.action = form.get('button')
