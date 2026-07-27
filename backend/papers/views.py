from django.http import JsonResponse
from django.views.decorators.http import require_GET
from requests.exceptions import RequestException

from .services import SemanticScholarService

@require_GET
def paper_search_view(request):
    """View to handle paper search requests.

    Args:
        request (HttpRequest): The incoming HTTP request.

    Returns:
        JsonResponse: A JSON response containing the search results or an error message.
    """
    query = request.GET.get("query", "dna repair")
    limit = int(request.GET.get("limit", 5))

    try:
        results = SemanticScholarService.search_papers(query=query, limit=limit)
        return JsonResponse(results, safe=False)
    except RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)

@require_GET
def paper_details_view(request, paper_id: str, fields: list[str] | None = None):
    """View to handle requests for detailed information about a specific paper.

    Args:
        request (HttpRequest): The incoming HTTP request.
        paper_id (str): The unique identifier of the paper.
        fields (list[str], optional): The fields to include in the response. Defaults to None.
    Raises:
        RequestException: If there is an error while fetching paper details from the Semantic Scholar API.
    Returns:
        JsonResponse: A JSON response containing the paper details or an error message.
    """
    print(f"Fetching details for paper ID: {paper_id} with fields: {fields}")  # Debugging line to check the paper ID and fields

    try:
        details = SemanticScholarService.get_paper_details(paper_id=paper_id, fields=fields)
        return JsonResponse(details)
    except RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)