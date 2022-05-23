using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace API.Extenstions
{
    public static class HttpExtensions
    {
        public static void AddPaginationsHeader(this HttpResponse response, int currantPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new 
            {
                currantPage,
                itemsPerPage,
                totalItems,
                totalPages
            };            
            response.Headers.Add("Access-Control-Expose-Headers",
                JsonConvert.SerializeObject(paginationHeader));           
           
        }
    }
}