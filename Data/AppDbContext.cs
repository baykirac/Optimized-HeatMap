using HeatMap.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Object = HeatMap.Models.Entities.Object;

namespace HeatMap.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {

    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Object> Objects { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresExtension("postgis")
            .HasPostgresExtension("postgis_raster")
            .HasPostgresExtension("topology", "postgis_topology");

        modelBuilder.Entity<Object>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("objects_pk");

            entity.ToTable("objects");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("nextval('id_seq'::regclass)")
                .HasColumnName("id");
            entity.Property(e => e.Geoloc).HasColumnName("geoloc");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });
        modelBuilder.HasSequence("id_seq");

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
