import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")  # service role key

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

email = "test1@careerpilot.ai"
new_password = "Test@12345"

# list users
users = supabase.auth.admin.list_users()

target_user = None

for user in users:
    if user.email == email:
        target_user = user
        break

if not target_user:
    print("User not found")
    exit()

# reset password + confirm
supabase.auth.admin.update_user_by_id(
    target_user.id,
    {
        "password": new_password,
        "email_confirm": True
    }
)

print("USER RESET SUCCESS")
print("UUID:", target_user.id)