class Zombie < ActiveRecord::Base
  has_one :brain, :dependent => :destroy
  has_many :tweets
  has_many :weapons
  has_many :supports

  validates :name, :presence => true, :length => {:in => 3..50,  :too_short => "must have at least #{count} words",
    :too_long => "must have at most #{count} words" }, :uniqueness => true
  validates :age, :numericality => { :only_integer => true, :greater_than => 0 }
end



