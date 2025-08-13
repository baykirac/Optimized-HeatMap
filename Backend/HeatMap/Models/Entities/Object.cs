using System;
using System.Collections.Generic;
using HeatMap.Models.Base;
using NetTopologySuite.Geometries;

namespace HeatMap.Models.Entities;

public partial class Object : BaseEntity
{
    public string? Name { get; set; }
    public Geometry? Geoloc { get; set; }
}
