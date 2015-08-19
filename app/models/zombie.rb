class Zombie < ActiveRecord::Base

  has_one :brain, :dependent => :destroy
  has_many :tweets
  has_many :equips
  has_many :weapons, :through => :equips
  has_many :cloths
  has_many :supports, :through => :cloths

  validates :name, :presence => true, :length => {:in => 3..50}, :uniqueness => true
  validates :gold,:attack,:defence,:speed, :numericality => { :only_integer => true, :greater_than => 0 }
  self.include_root_in_json = false

end



