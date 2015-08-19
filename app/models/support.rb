class Support < ActiveRecord::Base
  has_many :cloths
  has_many :zombies, :through => :cloths, :source => :zombie

end