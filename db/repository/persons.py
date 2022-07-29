from api.forms.form_info import SearchInfoForm
from sqlalchemy.orm import Session


def get_info(db: Session, params: SearchInfoForm):
    result = db.execute(f"""
    select  t.status, t.type, t.fio, t.product_name, t.payment_sum, t.currency,
            t.service_short_name, t.create_date, t.payment_check 
    from    ib_ib_payment t  
    left join ib_ib_client_user u on u.id = t.user_id::numeric  
    where   (u.mobile_phone = '{params.phone_number}' or u.personal_number = '{params.identify_number}' 
            or u.abs_number in ('{params.abs_number}') ) 
    and t.create_date::date between TO_DATE('{str(params.data_from)}', 'YYYY-MM-DD HH24:MI:SS ')  
                        and TO_DATE('{str(params.data_to)}', 'YYYY-MM-DD HH24:MI:SS ');""").fetchall()

    return result


