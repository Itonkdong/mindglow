import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR.parent / ".env")
load_dotenv(BASE_DIR / ".env")


def get_env(name: str, default: str = "") -> str:
    """Return a deployment-controlled setting from the environment."""
    return os.getenv(name, default)


def get_bool_env(name: str, default: bool = False) -> bool:
    """Return a boolean environment value using common truthy strings."""
    value = os.getenv(name)
    if value is None:
        return default
    return value.lower() in {"1", "true", "yes", "on"}
