import os
import requests

from typing import Any
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file


SEMANTIC_SCHOLAR_SEARCH_URL = (
    "https://api.semanticscholar.org/graph/v1/paper/search"
)

class SemanticScholarService:
    """Service client for interacting with the Semantic Scholar REST API."""

    DEFAULT_FIELDS = [
        "paperId",
        "title",
        "abstract",
        "authors",
        "year",
        "openAccessPdf",
        "tldr",
    ]

    DEFAULT_PAPER_FIELDS = [
        "paperId",
        "title",
        "abstract",
        "authors",
        "year",
        "venue",
        "citationCount",
        "referenceCount",
        "isOpenAccess",
        "openAccessPdf",
        "tldr",
    ]
    API_KEY = os.getenv("SEMANTIC_SCHOLAR_API_KEY")  # Load the API key from environment variables

    @classmethod
    def search_papers(cls, query: str, limit: int = 5, fields: list[str] | None = None) -> dict[str, Any]:
        """Search for papers using the Semantic Scholar API.

        Args:
            query (str): The search query.
            limit (int, optional): The maximum number of results to return. Defaults to 5.
            fields (list[str], optional): The fields to include in the response. Defaults to None.
        """

        if fields is None:
            fields = cls.DEFAULT_FIELDS

        params = {
            "query": query,
            "limit": limit,
            "fields": ",".join(fields),
            "isOpenAccess": "true",  # Ensures we get papers with accessible full-text PDFs
        }

        # Polite User-Agent header (recommended by Semantic Scholar)
        headers = {"User-Agent": "ScienceDigestBackend/1.0"}

        api_key = os.getenv("SEMANTIC_SCHOLAR_API_KEY")
        print(f"Using Semantic Scholar API Key: {api_key}")  # Debugging line to check if the API key is being read correctly
        if api_key:
            headers["x-api-key"] = api_key

        response = requests.get(SEMANTIC_SCHOLAR_SEARCH_URL, params=params, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()

    @classmethod
    def get_paper_details(cls, paper_id: str, fields: list[str] | None = None) -> dict:
        """Get detailed information about a specific paper using its paper ID.

        Args:
            paper_id (str): The unique identifier of the paper.
            fields (list[str], optional): The fields to include in the response. Defaults to None.
        """

        if fields is not None:
            params = {
               "fields": ",".join(fields)
            }
        else:
            params = {
               "fields": ",".join(cls.DEFAULT_PAPER_FIELDS)
            }

        url = f"https://api.semanticscholar.org/graph/v1/paper/{paper_id}"
       
        headers = {"User-Agent": "ScienceDigestBackend/1.0"}

        api_key = os.getenv("SEMANTIC_SCHOLAR_API_KEY")
        print(f"Using Semantic Scholar API Key: {api_key}")  # Debugging line to check if the API key is being read correctly
        if api_key:
            headers["x-api-key"] = api_key

        response = requests.get(url, params=params, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()