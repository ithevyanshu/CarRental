using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared
{
    public class RentalAgreement
    {
        public string? Id { get; set; }
        public string? CarId { get; set; }
        public string? UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int RentalDuration { get; set; }
        public Boolean? ReturnReq { get; set; }
        public Boolean? ReturnResp { get; set; }
    }
}
