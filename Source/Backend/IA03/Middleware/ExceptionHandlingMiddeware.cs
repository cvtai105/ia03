using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace IA03.Middleware
{
    public class ExceptionHandlingMiddeware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddeware> _logger;
        public ExceptionHandlingMiddeware(RequestDelegate next, ILogger<ExceptionHandlingMiddeware> logger)
        {
            _next = next;
            _logger = logger;
        }
    
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred: {Message}",ex.Message);
                var problemDetails = new ProblemDetails
                {
                    Title = ex.Message,
                    Status = StatusCodes.Status500InternalServerError,
                    Detail = ex.StackTrace
                };

                context.Response.StatusCode = StatusCodes.Status500InternalServerError;

                await context.Response.WriteAsJsonAsync(problemDetails);
            }
        }

    }
}