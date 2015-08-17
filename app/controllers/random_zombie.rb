require 'time'

class ZombieGenerator
  def initialize(args={})
    @name = {}
    @firsts = ['Fred', 'Julie', 'Bill', 'Ted', 'Jack', 'John', 'Mark', 'Mike', 'Chris', 'Bob', 'Travis', 'Kelly', 'Sara']
    @lasts = ['Jones', 'Smith', 'Lee', 'Wilson', 'Black', 'Williams', 'Lewis', 'Johnson', 'Foot', 'Little', 'Vee', 'Train', 'Hot', 'Mutt']
    @bios = ['man', 'tree', 'monster', 'ped', 'plant', 'fish', 'bird']
    @firsts_len = @firsts.length
    @lasts_len = @lasts.length

    @domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'yopmail.com', 'hotmail.com','edge-works.net']
    @domains_len = @domains.length

    @first_mobile = ['016','012','09']

  end

  def generate(num, unique=false)
    data = []
    1.upto(num).each do |idx|
      name = random_name(unique)
      data << {
        'name' => name,
        'bio' => random_bio,
        'email' => random_email(name),
        'age' => random_age,
        'gold' => random_number,
        'attack' => random_number,
        'defence' => random_number,
        'speed' => random_number,
        'password' => random_number,
      }
    end
    data
  end

  def random_bio
    @bios[get_random_int(0,@bios.length)]
  end

  def random_age
    get_random_int(0,100)
  end

  def random_number
    get_random_int(0,1000)
  end

  def random_password
    (0...5).map { ('a'..'z').to_a[rand(26)] }.join
  end

  def random_name(unique=false)
    name = @firsts[get_random_int(0,@firsts_len-1)] + ' ' + @lasts[get_random_int(0,@lasts_len-1)]
    return random_name(unique) if @used_names[name]
    @used_names[name] = true
    name
  end


  def random_email(name=nil, unique=false)
    name ||= random_name(unique)
    name.downcase.gsub(' ','.') + '@' + @domains[get_random_int(0,@domains_len-1)]
  end

  private
  def get_random_int(min, max)
    (rand*(max-min+1)).floor+min
  end
end