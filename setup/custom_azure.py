from storages.backends.azure_storage import AzureStorage
from decouple import config

class AzureMediaStorage(AzureStorage):
    account_name = 'getapet'
    account_key = config("ACCOUNT_KEY")
    azure_container = 'media'
    expiration_secs = None
