import requests

def get_location():
    ipStack = requests.get("http://api.ipstack.com/154.159.237.28?access_key=1cf4c65dbcd36b162dc944bc3fac9889&format=1")
    location = ipStack.json()
    return location