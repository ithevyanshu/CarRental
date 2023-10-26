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
    public class CarController : Controller
    {
        private readonly ICar _car;
        public CarController(ICar car)
        {
            _car = car;
        }

        [HttpGet("get-all-cars")]
        public IActionResult GetCars()
        {
            return Ok(_car.Get());
        }

        [HttpGet("get-car/{id}")]
        public IActionResult GetCar(string id)
        {
            var car = _car.Get(id);
            return Ok(car);
        }

        [HttpPost("add-car")]
        public IActionResult AddCar(CarDetails carDetails)
        {
            _car.Add(carDetails);
            return Ok();
        }

        [HttpPut("update-car/{id}")]
        public IActionResult UpdateCar(string id, CarDetails carDetails)
        {
            _car.Update(id, carDetails);
            return Ok();
        }

        [HttpDelete("delete-car/{id}")]
        public IActionResult DeleteCar(string id)
        {
            _car.Delete(id);
            return Ok();
        }
    }
}
