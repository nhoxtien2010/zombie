

class Zombie
  attr_accessor :name, :bio, :email, :age, :gold, :attack, :defence, :speed, :password

  def initialize(hash)
    @name = hash["name"]
    @bio = hash["bio"]
    @email = hash["email"]
    @age = hash["age"]
    @gold = hash["gold"]
    @attack = hash["attack"]
    @defence = hash["defence"]
    @speed= hash["speed"]
    @password= hash["password"]
  end
end