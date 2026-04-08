import os
import logging
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

try:
    from supabase import create_client, Client
    HAS_SUPABASE = True
    print("[SUPABASE] SDK import success")
except ImportError as e:
    HAS_SUPABASE = False
    print(f"[SUPABASE] SDK import failed: {e}")

    class Client:
        pass


_supabase_client: Optional["Client"] = None


def get_supabase_client() -> Optional["Client"]:
    global _supabase_client

    if _supabase_client is not None:
        print("[SUPABASE] Reusing existing client")
        return _supabase_client

    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")

    print("[SUPABASE] URL loaded =", bool(url))
    print("[SUPABASE] KEY loaded =", bool(key))
    print("[SUPABASE] SDK available =", HAS_SUPABASE)

    if not url or not key:
        print("[SUPABASE] Missing URL or KEY")
        return None

    if not HAS_SUPABASE:
        print("[SUPABASE] SDK missing")
        return None

    try:
        _supabase_client = create_client(url, key)
        print("[SUPABASE] Client initialized successfully")
        return _supabase_client
    except Exception as e:
        print(f"[SUPABASE] Client init failed: {e}")
        return None