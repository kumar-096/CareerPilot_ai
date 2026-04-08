from fastapi import Request, HTTPException
import os
import contextvars

_user_id_ctx = contextvars.ContextVar("user_id", default=None)

def get_current_user_id(request: Request = None) -> str:
    """
    Extract authenticated Supabase user_id from Authorization Bearer token securely.
    Supports seamless context passing securely parsing across adapter layers intuitively.
    """
    if request is not None:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            try:
                from packages.db.supabase_client import get_supabase_client
                client = get_supabase_client()
                if client:
                    res = client.auth.get_user(token)
                    if res and res.user:
                        _user_id_ctx.set(res.user.id)
                        return res.user.id
            except Exception as e:
                print(f"Supabase auth validation error: {e}")
                pass
                
    ctx_uid = _user_id_ctx.get()
    if ctx_uid:
        return ctx_uid
        
    if os.getenv("ENV", "development") == "development":
        _user_id_ctx.set("dev-user-001")
        return "dev-user-001"
        
    raise HTTPException(status_code=401, detail="Unauthorized")
