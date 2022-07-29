from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from ldap3 import ALL, Connection, Server
from ldap3.core.exceptions import LDAPException
from core.config import LDAP_HOST, LDAP_PORT


router = APIRouter()
security = HTTPBasic()


def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    server = Server(host=LDAP_HOST, port=LDAP_PORT, use_ssl=False, get_info=ALL)
    try:
        with Connection(
            server=server,
            authentication="SIMPLE",
            user=credentials.username,
            password=credentials.password,
            read_only=True,
        ) as connection:
            print(connection.result)  # "success" if bind is ok
            return credentials.username
    except LDAPException as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials"
        )

#
# @router.get("/")
# def root(username: str = Depends(get_current_username)):
#     return {"message": f"Welcome {username}"}