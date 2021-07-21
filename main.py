from discord import Client
from discord.message import Message
import os

client = Client()

@client.event
async def on_ready():
    print(f"")

@client.event
async def on_message(msg: Message):
    msg.content

client.run(os.getenv("DC_TOKEN"))