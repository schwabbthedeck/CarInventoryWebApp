using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CarInventoryWebApp.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
				private static List<BaseVehicleInformation> VehicleData = new List<BaseVehicleInformation>(new BaseVehicleInformation[] {
						new BaseVehicleInformation { Type="Car", Make="Ford", Model="Focus", RetailPrice=16500 },
						new BaseVehicleInformation { Type="Car", Make="Ford", Model="Fusion", RetailPrice=22000 },
						new BaseVehicleInformation { Type="Truck", Make="Ford", Model="F-150", RetailPrice=24500 },
						new BaseVehicleInformation { Type="Car", Make="Lincoln", Model="MKZ", RetailPrice=34500 },
						new BaseVehicleInformation { Type="SUV", Make="Lincoln", Model="Navigator", RetailPrice=56000 },
						new BaseVehicleInformation { Type="Car", Make="Dodge", Model="Avenger", RetailPrice=20500 },
						new BaseVehicleInformation { Type="Car", Make="Dodge", Model="Dart", RetailPrice=16000 },
						new BaseVehicleInformation { Type="SUV", Make="Dodge", Model="Durango", RetailPrice=29500 }
				});

				[HttpGet("[action]")]
				public List<InventoryVehicle> GetVehicles()
				{
						List<InventoryVehicle> vehicles = new List<InventoryVehicle>(
								new InventoryVehicle[]
								{
										new InventoryVehicle(VehicleData[0], 2018, "Two Door", "Gas", "Manual", "Cloth", Guid.NewGuid().ToString()),
										new InventoryVehicle(VehicleData[0], 2019, "Four Door", "Electric", "Automatic", "Cloth", Guid.NewGuid().ToString()),
										new InventoryVehicle(VehicleData[1], 2019, "Four Door", "Hybrid", "Automatic", "Cloth", Guid.NewGuid().ToString()),
										new InventoryVehicle(VehicleData[2], 2018, "Two Door", "Gas", "Automatic", "Cloth", Guid.NewGuid().ToString()),
										new InventoryVehicle(VehicleData[3], 2018, "Two Door", "Gas", "Manual", "Cloth", Guid.NewGuid().ToString()),
										new InventoryVehicle(VehicleData[4], 2019, "Four Door", "Hybrid", "Automatic", "Cloth", Guid.NewGuid().ToString()),
										new InventoryVehicle(VehicleData[5], 2019, "Two Door", "Gas", "Automatic", "Cloth", Guid.NewGuid().ToString()),
										new InventoryVehicle(VehicleData[6], 2019, "Two Door", "Gas", "Manual", "Cloth", Guid.NewGuid().ToString()),
										new InventoryVehicle(VehicleData[7], 2018, "Four Door", "Gas", "Automatic", "Cloth", Guid.NewGuid().ToString()),
								});

						return vehicles;
				}

				public class BaseVehicleInformation
				{
						public string Make { get; set; }
						public string Model { get; set; }
						public string Type { get; set; }
						public double RetailPrice { get; set; }
				}

				public class InventoryVehicle : BaseVehicleInformation
				{
						public int Year { get; set; }
						public double PriceWithFeatures { get; set; }
						public List<string> Features { get; set; }
						public string Guid { get; set; }

						public InventoryVehicle(BaseVehicleInformation baseVehicleInformation, int year, string doorOptions, string fuelOptions, string transmissionOptions, string interOptions, string guid)
						{
								this.Make = baseVehicleInformation.Make;
								this.Model = baseVehicleInformation.Model;
								this.Type = baseVehicleInformation.Type;
								this.RetailPrice = baseVehicleInformation.RetailPrice;
								this.Year = year;
								this.Guid = guid;

								this.Features = new List<string>(new string[] { doorOptions, fuelOptions, transmissionOptions, interOptions});

								double price = this.RetailPrice;
								// add door option cost
								if (doorOptions == "Four Door")
								{
										price += 2500;
								}
								// add fuel option cost
								if (fuelOptions == "Hybrid")
								{
										price += 10000;
								}
								else if (fuelOptions == "Electric")
								{
										price += 15000;
								}
								// add transmission option cost
								if (transmissionOptions == "Automatic")
								{
										price += 1000;
								}
								// might need to do interior option cost soon


								// set price 
								this.PriceWithFeatures = price;
						}
				}
    }
}
