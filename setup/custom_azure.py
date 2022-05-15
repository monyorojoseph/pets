from storages.backends.azure_storage import AzureStorage

class AzureMediaStorage(AzureStorage):
    account_name = 'getapet'
    account_key = '/4FtHD6q4XcINc1Se3+edSfm/Y3yZaQE9iIayIT4yUHzeZVQVSa+fsXgeFHKyfjaRYbNGCn9zsJr+AStjK4lrA=='
    azure_container = 'media'
    expiration_secs = None
