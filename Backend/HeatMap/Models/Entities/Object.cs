using System;
using System.Collections.Generic;
using HeatMap.Models.Base;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;

namespace HeatMap.Models.Entities;

public partial class Object : BaseEntity
{
    public string Name { get; set; }
    public Geometry Geoloc { get; set; }
    public string GeolocWkt
    {
        get
        {
            if (Geoloc == null) return null;
            var writer = new WKTWriter();
            return writer.Write(Geoloc);
        }
    }
}
