class WeaponGenerator

  attr_accessor :weapon_names
  def initialize(args={})
    @weapon_names = ["Battle Axes","Bombs & Missiles","Bows & Crossbows","Claws","Daggers","Dual Wielding","Fist Weapons","Maces & Flails","Magic books" ,"Magic weapons","Pistols","Rifles","Sci-fi Guns","Shotguns","Flail & Maces","Magic Books","Magic Weapons","Pistols","Rifles","Sci-fi","Guns","Shotguns","Spears & Halberds","Staves","Swords","Throwing Weapons"]
  end

  def generate(num, unique=false)
    data = []
    1.upto(num).each do |idx|
      name = random_name(unique)
      data << {
        'name' => random_name,
        'price' => random_number,
        'attack' => random_number,
        'speed' => random_number,
        'range' => random_number,
        'weapon_type_id' => get_random_int(0,9),
        'defence' => random_number
      }
    end
    data
  end


  def random_number
    get_random_int(0,1000)
  end

  def random_name
    @weapon_names[get_random_int(0, @weapon_names.length-1)]
  end



  private
  def get_random_int(min, max)
    (rand*(max-min+1)).floor+min
  end

end