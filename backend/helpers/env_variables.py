import os
from pathlib import Path

from dotenv import load_dotenv

from helpers import constants


BASE_DIR = Path(__file__).resolve().parent.parent
BACKEND_ENV_PATH = BASE_DIR / ".env"

load_dotenv(BACKEND_ENV_PATH)


def get_env(name: str, default: str = "") -> str:
    """Return a deployment-controlled setting from the environment."""
    return os.getenv(name, default)


def get_bool_env(name: str, default: bool = False) -> bool:
    """Return a boolean environment value using common truthy strings."""
    value = os.getenv(name)
    if value is None:
        return default
    return value.lower() in {"1", "true", "yes", "on"}


def get_first_env(names: tuple[str, ...], default: str = "") -> str:
    """Return the first configured value from a list of accepted environment names."""
    for name in names:
        value = os.getenv(name)
        if value not in (None, ""):
            return value
    return default


def get_list_env(name: str, default: str) -> list[str]:
    """Return a comma-separated environment value as a cleaned list."""
    return [item.strip() for item in get_env(name, default).split(",") if item.strip()]


SECRET_KEY = get_env("SECRET_KEY", constants.DEFAULT_SECRET_KEY)
DEBUG = get_bool_env("DEBUG", constants.DEFAULT_DEBUG)
ALLOWED_HOSTS = get_list_env("ALLOWED_HOSTS", constants.DEFAULT_ALLOWED_HOSTS)
DATABASE_NAME = get_first_env(("DATABASE_NAME", "POSTGRES_DB"), constants.DEFAULT_DATABASE_NAME)
DATABASE_USER = get_first_env(("DATABASE_USER", "POSTGRES_USER"), constants.DEFAULT_DATABASE_USER)
DATABASE_PASSWORD = get_first_env(("DATABASE_PASSWORD", "POSTGRES_PASSWORD"), constants.DEFAULT_DATABASE_PASSWORD)
DATABASE_HOST = get_env("DATABASE_HOST", constants.DEFAULT_DATABASE_HOST)
DATABASE_PORT = get_env("DATABASE_PORT", constants.DEFAULT_DATABASE_PORT)
FRONTEND_URL = get_env("FRONTEND_URL", constants.DEFAULT_FRONTEND_URL)
OPENAI_API_KEY = get_env("OPENAI_API_KEY", constants.DEFAULT_OPENAI_API_KEY)
OPENAI_MODEL = get_env("OPENAI_MODEL", constants.DEFAULT_OPENAI_MODEL)
TIME_ZONE = get_env("TIME_ZONE", constants.DEFAULT_TIME_ZONE)
