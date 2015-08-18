class WeaponTypeGenerator
  def initialize(args={})
    @weapons_type_name = ["sword", "gun", "archery", "lance", "ax", "armor","rod","rope","knife","darts"]
  end

  def generate(num, unique=false)
    data = []
    1.upto(num).each do |idx|
      name = random_name(unique)
      data << {
        'name' => name
      }
    end
    data
  end

  def random_name
    @weapon_names[get_random_int(0, @weapon_names.length-1)]
  end



  private
  def get_random_int(min, max)
    (rand*(max-min+1)).floor+min
  end

end