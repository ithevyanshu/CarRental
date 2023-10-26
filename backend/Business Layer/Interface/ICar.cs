using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Interface
{
    public interface ICar
    {
        public void Add(CarDetails car);
        public void Update(string id, CarDetails car);
        public void Delete(string id);
        public CarDetails Get(string id);
        public List<CarDetails> Get();
    }
}
