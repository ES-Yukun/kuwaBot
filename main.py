from discord import Client
from discord.message import Message
import os

client = Client()

@client.event
async def on_ready():
    print(f"ミニくわです！")

@client.event
async def on_message(msg: Message):
    msg.content
    for channel in client.get_all_channels():
        if channel.name == "ミニくわ":
            await channel.send("ミニくわ起動しました")
client.run(os.getenv("DC_TOKEN"))
