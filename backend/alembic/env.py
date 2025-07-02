import sys
import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# Ensure project root is on sys.path to import 'app'
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

# Import settings and metadata
from app.core.config import settings
from app.models import Base  # Base defined in app/models/__init__.py

# Alembic Config object
config = context.config

# Use sync driver for migrations (replace +asyncpg)
tmp_url = str(settings.database_url)
sync_url = tmp_url.replace('+asyncpg', '')
config.set_main_option('sqlalchemy.url', sync_url)

# Python logging
fileConfig(config.config_file_name)

target_metadata = Base.metadata

def run_migrations_offline():
    """
    Run migrations in 'offline' mode.
    """
    url = config.get_main_option('sqlalchemy.url')
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={'paramstyle': 'named'},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """
    Run migrations in 'online' mode.
    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

# Determine execution mode
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()