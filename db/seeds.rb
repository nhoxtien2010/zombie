# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

require 'lib/zombie_generator'
require 'lib/weapon_generator'


# random zombie
zombie_arr = ZombieGenerator.new.generate(1)
zombie_arr.each do |zombie_hash|
  zombie = Zombie.new
  zombie.name = zombie_hash["name"]
  zombie.attack = zombie_hash["attack"]
  zombie.defence = zombie_hash["defence"]
  zombie.gold = zombie_hash["gold"]
  zombie.speed = zombie_hash["speed"]
  zombie.bio = zombie_hash["bio"]
  zombie.birthday = zombie_hash["birthday"]
  zombie.password = zombie_hash["password"]
  zombie.save
end


# random weapon
weapon_arr = WeaponGenerator.new.generate(1)
weapon_arr.each do |weapon_hash|
  weapon = Weapon.new
  weapon.name = weapon_hash["name"]
  weapon.attack = weapon_hash["attack"]
  weapon.range = weapon_hash["range"]
  weapon.price = weapon_hash["price"]
  weapon.speed = weapon_hash["speed"]
  weapon.save
end

# random support
support_arr = WeaponGenerator.new.generate(1)
support_arr.each do |support_hash|
  support = Support.new
  support.name = support_hash["name"]
  support.attack = support_hash["attack"]
  support.defence = support_hash["defence"]
  support.price = support_hash["price"]
  support.speed = support_hash["speed"]
  support.save
end



def get_random_int(min, max)
  (rand*(max-min+1)).floor+min
end


# random equip
zombie_id = Zombie.select("id")
zombie_length = zombie_id.length-1
support_id = Support.select("id")
support_length = support_id.length-1

weapon_id = Weapon.select("id")
weapon_length = weapon_id.length-1


# random cloth

1.times do

  cloth = Cloth.new
  cloth.zombie_id = zombie_id[get_random_int(0, zombie_length)].id
  cloth.support_id = support_id[get_random_int(0, support_length)].id
  cloth.save

end


# random equip
1.times do

  equip = Equip.new
  equip.zombie_id = zombie_id[get_random_int(0, zombie_length)].id
  equip.weapon_id = weapon_id[get_random_int(0, weapon_length)].id
  equip.save

end


# random tweet

times = ["Today, ", "Yesterday, ", "Tomorow, ", "Now, ", "Then, ", "Monday, ", "Sunday, ", "Tuesday, ", "Wenesday, ","Thurday, ", "Friday, ", "Saturday, "]
time_length = times.length-1


message = []
message << "Im tired"
message << "Im so hungry"
message << "Im thirty"
message << "Im need some brain to eat"
message << "Can some one help me"
message << "I like chicken dance"
message << "I like hiphop"
message << "Do you love me girl?"

message << "Calmdown"
message << "Oh my god"
message << "I need some waters"

message << "Can you give me some money"
message << "What happen with me"
message << "What the held"
message << "I love my mother"
message << "I love my father"
message << "Never give up"

message_length = message.length-1

1.times do
  status = times[get_random_int(0,time_length)] + message[get_random_int(0, message_length)]
  tweet = Tweet.new
  tweet.status = status
  tweet.zombie_id = zombie_id[get_random_int(0,zombie_length)].id
  tweet.save
end





