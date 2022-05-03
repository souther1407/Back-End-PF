const { Hostel } =  require('../db/models/hostel.model')

class HostelService {

  async mostrarInfo() {
    const infoHostel = await Hostel.findAll();
      
      return infoHostel 
  }

  async infoById(id) {
    console.log(id)
    const infoHostel = await Hostel.findByPk(id);
      console.log(infoHostel)
    return infoHostel 
  }

  async crear(data) {
    const { title, description, url } = data;
    
    const infoHostel = await Hostel.create({
      title,
      description,
      url
    })
    return infoHostel
    
  }

  async modificarInfo(id, data) {
    const { title, description, url } = data;
    
    const infoHostel = await Hostel.findByPk(id)

    infoHostel.update({
      title,
      description,
      url
    })
    return infoHostel
  }

  async delete(id) {
    
    const infoHostel = await Hostel.findByPk(id)

    infoHostel.destroy()
    return infoHostel
  }

}

module.exports = HostelService;
