using Business_Layer.Implementation;
using Business_Layer.Interface;
using Data_Layer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Shared;

namespace Car_Rental_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class RentalController : Controller
    {
        private readonly IRental _rental;
        public RentalController(IRental rental)
        {
            _rental = rental;
        }

        [HttpGet("get-all-agreement")]
        public IActionResult GetAgreement()
        {
            return Ok(_rental.Get());
        }

        [HttpGet("get-agreement/{id}")]
        public IActionResult GetAgreement(string id)
        {
            var agreement = _rental.Get(id);
            return Ok(agreement);
        }

        [HttpPost("add-agreement")]
        public IActionResult AddAgreement(RentalAgreement agreement)
        {
            _rental.Add(agreement); 
            return Ok();
        }

        [HttpPut("update-agreement/{id}")]
        public IActionResult UpdateAgreement(string id, DateTime startDate, DateTime endDate)
        {
            _rental.Update(id, startDate, endDate);
            return Ok();
        }

        [HttpPatch("return-request/{id}")]
        public IActionResult ReturnRequest(string id, Boolean request)
        {
            _rental.ReturnRequest(id, request);
            return Ok();
        }

        [HttpPatch("return-response/{id}")]
        public IActionResult ReturnResponse(string id, Boolean response)
        {
            _rental.ReturnResponse(id, response);
            return Ok();
        }


        [HttpDelete("delete-agreement/{id}")]
        public IActionResult DeleteAgreement(string id)
        {
            _rental.Delete(id);
            return Ok();
        }
    }
}
