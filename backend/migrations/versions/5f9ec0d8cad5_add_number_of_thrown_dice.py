"""add number of thrown dice

Revision ID: 5f9ec0d8cad5
Revises: 607cb4c5dee9
Create Date: 2020-03-23 18:31:45.513561

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5f9ec0d8cad5'
down_revision = '607cb4c5dee9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('number_dice', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'number_dice')
    # ### end Alembic commands ###