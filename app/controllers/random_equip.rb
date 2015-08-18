# random equip 
exist_hash = {}

1000.times do 
  equip = Equip.new
  zombie_length = Zombie.all.length
  weapon_length = Weapon.all.length
  equip.zombie = Zombie.find(get_random_int(1, zombie_length))
  equip.weapon = Weapon.find(get_random_int(1,weapon_length))
  equip.save unless exist_hash["#{equip.zombie_id}#{equip.weapon_id}"]
  exist_hash["#{equip.zombie_id}#{equip.weapon_id}"] = true
end

def get_random_int(min, max)
  (rand*(max-min+1)).floor+min
end