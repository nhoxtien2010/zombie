class Weapon < ActiveRecord::Base
  has_many :equips
  has_many :zombies, :through => :equips, :source => :zombie
  belongs_to :weapon_type

  self.include_root_in_json = false
end