using Business_Layer.Interface;
using Data_Layer.Interface;
using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Implementation
{
    public class Car : ICar
    {
        private readonly ICarDL _car;

        public Car(ICarDL car)
        {
            _car = car;
        }
        public List<CarDetails> Get() {
            return _car.Get().ToList();
        }
        public CarDetails Get(string id) {
            return _car.Get(id);
        }

        public void Add(CarDetails car) {
            car.Id = Guid.NewGuid().ToString();
            _car.Add(car);
            _car.Save();
        }
        public void Update(string id, CarDetails xcar) {
            var car = _car.Get(id);
            car.Maker = xcar.Maker;
            car.Model = xcar.Model;
            car.Price = xcar.Price;
            car.ImageUrl = xcar.ImageUrl;
            _car.Update(car);
            _car.Save();
        }
        public void Delete(string id) {
            var car = _car.Get(id);
            _car.Delete(car);
            _car.Save();
        }
    }
}
