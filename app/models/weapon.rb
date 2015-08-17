class Weapon < ActiveRecord::Base
  belongs_to :zombie
  belongs_to :weapon_type
end